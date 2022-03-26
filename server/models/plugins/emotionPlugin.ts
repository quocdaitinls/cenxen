import {Emotions} from "cex";
import {Schema} from "mongoose";

const emotionPlugin = (schema: Schema, options: any) => {
  schema.methods.updateEmotions = function (userId: string, value: Emotions) {
    this.emotions.set(userId, value);
  };
};

export default emotionPlugin;
