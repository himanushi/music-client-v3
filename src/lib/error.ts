import { ApolloError } from "@apollo/client/core";
import { mergeWith } from "lodash";

const customizer = (objValue: any, srcValue: any) => {

  if (Array.isArray(objValue)) {

    return objValue.concat(srcValue);

  }
  return undefined;

};

export const errorMessages = (error: ApolloError): Record<string, string[]> => {

  const labels = error.graphQLErrors.map((err) => {

    const path = (err.extensions?.path || "_") as string;

    const label: Record<string, string[]> = {};
    label[path] = [err.message];
    return label;

  });

  return labels.reduce((labelSum, label) => mergeWith(labelSum, label, customizer)
  );

};
