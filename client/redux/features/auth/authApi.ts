/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userLoggedOut, userRegistration } from "./authSlice";

type RegistrationResponse = {
    message:string;
    activationToken:string;

};

type RegistrationData = {};

export const authApi = apiSlice.injectEndpoints({
    endpoints:(builder) =>({
        register:builder.mutation<RegistrationResponse,RegistrationData>({
            query:(data)=>({
                url:"registration",
                method:"POST",
                body:data,
                credentials:"include" as const,
            }),
            async onQueryStarted(arg,{queryFulfilled,dispatch}){
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        userRegistration({
                            token:result.data.activationToken,
                        })
                    )
                } catch (error:any) {
                    console.log(error)
                }
            }
        }),
        activation:builder.mutation({
            query:({activation_token,activation_code})=>({
                url:"activate-user",
                method:"POST",
                body:{
                    activation_code,
                    activation_token
                }
            })
        }),
        login:builder.mutation({
            query:({email,password})=>({
                url:"login",
                method:"POST",
                body:{
                    email,
                    password
                },
                credentials:"include" as const,
            }),
            async onQueryStarted(arg,{queryFulfilled,dispatch}){
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        userLoggedIn({
                            accessToken:result.data.accessToken,
                            user: result.data.user,
                        })
                    )
                } catch (error:any) {
                    console.log(error)
                }
            }
        }),
        socialAuth:builder.mutation({
            query:({email,name,avatar})=>({
                url:"social-auth",
                method:"POST",
                body:{
                    email,
                    name,
                    avatar
                },
                credentials:"include" as const,
            }),
            async onQueryStarted(arg,{queryFulfilled,dispatch}){
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        userLoggedIn({
                            accessToken:result.data.accessToken,
                            user: result.data.user,
                        })
                    )
                } catch (error:any) {
                    console.log(error)
                }
            }
        }),
        logOut:builder.query({
            query:()=>({
                url:"login",
                method:"GET",
                credentials:"include" as const,
            }),
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            async onQueryStarted(arg,{queryFulfilled,dispatch}){
                try {
                    dispatch(
                        userLoggedOut()
                    )
                } catch (error:any) {
                    console.log(error)
                }
            }
        }),

    })
})


export const {useLogOutQuery,useRegisterMutation,useActivationMutation,useLoginMutation,useSocialAuthMutation} = authApi;