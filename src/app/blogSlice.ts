import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supaBase from "../supabase-client";

interface Blog {
  id: number;
  title: string;
  content: string;
  user_id: string;
  madeBy: string;
}

interface BlogState {
  blogs: Blog[];
}

const initialState: BlogState = {
  blogs: []
};


export const fetchBlogs = createAsyncThunk('blogs/fetch', async () => {
  const { data, error } = await supaBase.from("Blogs").select("*");
  if (error) throw error;
  return data;
});


export const addBlog = createAsyncThunk('blogs/add', async (blogData: Omit<Blog, 'id'>) => {
  const { data, error } = await supaBase.from("Blogs").insert([blogData]).select();
  if (error) throw error;
  return data[0];
});

export const updateBlog = createAsyncThunk('blogs/update', async (blogData: Blog) => {
  const { data, error } = await supaBase.from("Blogs").update(blogData).eq("id", blogData.id).select();
  if (error) throw error;
  return data[0];
})


export const deleteBlog = createAsyncThunk('blogs/delete', async (id: number) => {
  const { error } = await supaBase.from("Blogs").delete().eq("id", id);
  if (error) throw error;
  return id;
});


const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBlogs.fulfilled, (state, action) => {
      state.blogs = action.payload;
    });
    builder.addCase(addBlog.fulfilled, (state, action) => {
      state.blogs.unshift(action.payload);
    });
    builder.addCase(deleteBlog.fulfilled, (state, action) => {
      state.blogs = state.blogs.filter(blog => blog.id !== action.payload);
    });
    builder.addCase(updateBlog.fulfilled, (state, action) => {
      state.blogs = state.blogs.map(blog => blog.id === action.payload.id ? action.payload : blog);
    })
  }
});

export default blogSlice.reducer;
