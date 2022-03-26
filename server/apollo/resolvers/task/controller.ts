import {TaskModel} from "@models";
import {Task} from "@models/task";
import {DocumentType} from "@typegoose/typegoose";
import {isNull} from "@utils/x";
import {Input_UpdateTask} from "./input";

// check id2 is valid to set parent_id for task_id1
export const checkValidParent = async (id1: string, id2: string) => {
  if (isNull(id1) || isNull(id2)) return true;
  const task2 = await TaskModel.findById(id2);
  return task2 ? !task2.isDescendantOf(id1) : false;
};

// check input must have only parent_id or section_id field
export const checkValidInput = (input: Object) => {
  return !(
    input.hasOwnProperty("section_id") && input.hasOwnProperty("parent_id")
  );
};

// create ancestors base on parent
export const buildAncestors = (
  parent: DocumentType<Task>
): Task["ancestors"] => {
  return [...parent.ancestors, parent._id];
};

// rebuild tree with root was updated
export const rebuildHierarchyTree = async (root: DocumentType<Task>) => {
  let descendants = await root.findDescendants();
  let treeCount = descendants.length + 1;
  let newTree = [];

  const _findChilds = (root: DocumentType<Task>) =>
    descendants.filter((task) => task.parent_id.toString() === root.id);

  let queue: DocumentType<Task>[] = [root];

  while (newTree.length < treeCount) {
    let task = queue.shift();
    newTree.push(task);

    let childs = _findChilds(task);
    childs.forEach((child) => {
      child.section_id = task.section_id;
      child.ancestors = buildAncestors(task);
      queue.push(child);
    });
  }

  await Promise.all(newTree.map((task) => task.save()));
  return newTree;
};

export const checkAndRepairInput = async (id: string, input: any) => {
  if (!checkValidInput(input)) return null;
  const newInput: any = input;

  if (newInput.hasOwnProperty("parent_id")) {
    const parentId = newInput.parent_id;
    if (!checkValidParent(id, parentId)) return null;
    if (!isNull(parentId)) {
      const parent = await TaskModel.findById(parentId);
      newInput.section_id = parent.section_id?.toString();
      newInput.ancestors = buildAncestors(parent).map((id) => id.toString());
    }
  } else if (newInput.hasOwnProperty("section_id")) {
    newInput.parent_id = null;
    newInput.ancestors = [];
  }

  return newInput;
};
