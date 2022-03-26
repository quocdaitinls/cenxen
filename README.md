TypeGraphql \_\_ TypeMongoose

default = null => nullable = true
required = true => nullable = false

- If the type of field is ObjectId (ex: Ref<User>,...), set the default as null;
- If the type of field is ObjectId[] (ex: Ref<User>[],...), set the default as [];
- If the type of field is String, set the default as "";

<!-- Todos -->

1 project có nhiều section (executors 1)
1 section có nhiều task (executors 2)
1 task có nhiều subtask (executors 3)

=> executors 1 >= executors 2 >= executors 3
