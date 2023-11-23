'use server';


import { db } from "@/db";
import { redirect } from "next/navigation";

export async function editSnippet(id: number, code: string){
    console.log(id, code);
    await db.snippet.update({
        where: {id},
        data: { code }
    });
    redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number){
    await db.snippet.delete({
        where: {id}
    });
    redirect('/');
}

export async function createSnippet(
    formState: {message: string}, 
    formData: FormData
) {
    try{
            // check users inputs and make sure are valid
        const title = formData.get("title");
        const code = formData.get("code");

        if (typeof title !== 'string' || title.length < 3){
            return {
                message: 'Title must be longer'
            };
        }

        if (typeof code !== "string" || code.length < 10) {
            return {
            message: "Snippet must be longer",
            };
        }

        // create a new record in the database
        await db.snippet.create({
            data: {
            title,
            code,
            },
        });
        
    } catch(err: unknown) {
            if (err instanceof Error) {
                return{
                    message: err.message
                }
            } else {
                return{
                    message: 'Something went wrong'
                }
            }
        }
        // return to home page
        redirect("/");
 }