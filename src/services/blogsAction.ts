import supaBase from '../supabase-client';

interface Blog {
    title: string;
    content: string;
    user_id: number;
}

export const fetchBlogs = async () => {
        const { data, error } = await supaBase.from("Blogs").select("*")

        if(error) {
            console.log(error)
            return
        }

        return data
}

export const addBlog = async (blogData: Blog) => {
    const { data, error } = await supaBase.from("Blogs").insert([blogData]).select()

    if(error) {
        console.log(error)
        return
    }

    return data
}

export const deleteBlog = async (id: number) => {
    const { data, error } = await supaBase.from("Blogs").delete().eq("id", id)

    if(error) {
        console.log(error)
        return
    }

    return data
}

export default { fetchBlogs, addBlog, deleteBlog }