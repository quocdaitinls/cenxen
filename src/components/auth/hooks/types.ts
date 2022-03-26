import {FormikConfig, FormikValues, useFormik} from "formik";

export type UseFormOptions<V> = Pick<FormikConfig<V>, "onSubmit">;

export type UseFormConfig<V> = (options: UseFormOptions<V>) => FormikConfig<V>;

// export type UseForm<V> = (config: UseFormOptions<V>) => unknown;
