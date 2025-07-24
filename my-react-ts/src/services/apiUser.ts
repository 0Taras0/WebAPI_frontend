import {createApi} from "@reduxjs/toolkit/query/react";
import {createBaseQuery} from "../utilities/createBaseQuery.ts";
import type {
    IAdminUserItem, IAdminUserUpdateModel, ISearchResult, IUserRoles, IUserSearchParams
} from "./types.ts";
import {serialize} from "object-to-formdata";

export const apiUser = createApi({
    reducerPath: 'api/user',
    baseQuery: createBaseQuery('Users'),
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        getAllUsers: builder.query<IAdminUserItem[], void>({
            query: () => 'list',
            providesTags: ['Users'],
        }),
        searchUsers: builder.query<ISearchResult<IAdminUserItem>, IUserSearchParams>({
            query: (params) => ({
                url: 'search',
                params,
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.items.map((u: IAdminUserItem) => ({ type: 'Users' as const, id: u.id })),
                        { type: 'Users', id: 'PARTIAL-LIST' },
                    ]
                    : [{ type: 'Users', id: 'PARTIAL-LIST' }],
        }),
        editUser: builder.mutation<void, IAdminUserUpdateModel>({
            query: (newUser: IAdminUserUpdateModel) => {
                try {
                    const formData = serialize(newUser);
                    return {
                        url: `edit`,
                        method: 'PUT',
                        body: formData
                    }

                } catch {
                    throw new Error('Error edit category')
                }
            },
            invalidatesTags: ['Users']
        }),
        getUser: builder.query<IAdminUserItem, string>({
            query: (id: string) => `/${id}`,
            providesTags: ['Users']
        }),
        getRoles: builder.query<IUserRoles, void>({
            query: () => 'roles'
        })
    }),
});


export const {
    useGetAllUsersQuery,
    useSearchUsersQuery,
    useEditUserMutation,
    useGetUserQuery,
    useGetRolesQuery
} = apiUser;