import {FormikConfig} from "formik";

export type UseFormOptions<V> = Pick<FormikConfig<V>, "onSubmit">;

export type UseFormConfig<V> = (options: UseFormOptions<V>) => FormikConfig<V>;
