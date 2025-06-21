import {createApi} from "@reduxjs/toolkit/query/react";
import type {ICategoryCreate, ICategoryEdit, ICategoryItem} from "./types.ts";
import {createBaseQuery} from "../utilities/createBaseQuery.ts";
import {serialize} from "object-to-formdata";

export const apiCategory = createApi({
    reducerPath: 'api',
    baseQuery: createBaseQuery("categories"),
    endpoints: (builder) => ({
        getAllCategories: builder.query<ICategoryItem[], void>({
            query: () => ''
        }),
        getCategory: builder.query<ICategoryItem, string>({
            query: (id: string) => `/${id}`
        }),
        createCategory: builder.mutation<ICategoryItem, ICategoryCreate>({
            query: (newCategory: ICategoryCreate) => {
                try {
                    const formData = serialize(newCategory);
                    return {
                        url: '',
                        method: 'POST',
                        body: formData
                    }

                }
                catch {
                    throw new Error('Error create category')
                }
            }
        }),
        editCategory: builder.mutation<ICategoryItem, ICategoryEdit>({
            query: (newCategory: ICategoryEdit) => {
                try {
                    const formData = serialize(newCategory);
                    return {
                        url: `${newCategory.id}`,
                        method: 'PUT',
                        body: formData
                    }

                }
                catch {
                    throw new Error('Error edit category')
                }
            }
        }),
        deleteCategory: builder.mutation<void, string>({
            query: (id: string) => {
                try {
                    return {
                        url: `${id}`,
                        method: 'DELETE'
                    }

                }
                catch {
                    throw new Error('Error delete category')
                }
            }
        }),
    }),
});

    export const {useGetAllCategoriesQuery, useCreateCategoryMutation, useGetCategoryQuery, useEditCategoryMutation, useDeleteCategoryMutation} = apiCategory;