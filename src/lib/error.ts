import { ApolloError } from "@apollo/client/core";
import {
  mergeWith, camelCase
} from "lodash";

const customizer = (objValue: any, srcValue: any) => {

  if (Array.isArray(objValue)) {

    return objValue.concat(srcValue);

  }
  return undefined;

};

export const errorMessages = (error: ApolloError): Record<string, string[]> => {

  const labels = error.graphQLErrors.map((err) => {

    let path: string;

    if (err.extensions?.path) {

      path = camelCase(err.extensions?.path as string);

    } else {

      path = "_";

    }

    const label: Record<string, string[]> = {};
    label[path] = [err.message];
    return label;

  });

  return labels.reduce((labelSum, label) => mergeWith(labelSum, label, customizer)
  );

};
