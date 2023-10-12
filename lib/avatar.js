import { supabase } from "@/lib/supabase";

export const saveAvatar = async (userId, file) => {
    const filename = `${userId}`;
    const { data, error } = await supabase.storage
        .from("avatars")
        .upload(filename, file, {
          cacheControl: "3600",
          upsert: true,
        });
  
     return data.path;
}

export const getAvatar = (userId, height = 100, width = 100) => {
  const { data } = supabase
        .storage
        .from("avatars")
        .getPublicUrl(`${userId}`, {
          transform: {
            width: height,
            height: width,
          }
        })
    
      return data;
  }

