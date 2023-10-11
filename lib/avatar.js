import { supabase } from "@/lib/supabase";

export class Avatar {
  constructor(userId, file) {
    this.userId = userId;
    this.file = file;  
  }

  saveAvatar = () => {
    const filename = `${this.userId}`;
    const { data, error } = await supabase.storage
        .from("avatars")
        .upload(filename, this.file, {
          cacheControl: "3600",
          upsert: true,
        });
  
     return data.path;
  }

  getAvatar = ({ height: 100, width: 100 }) => {
    const { data } = supabase
        .storage
        .from("avatars")
        .getPublicUrl(`${this.userId}`, {
          transform: {
            width: height,
            height: width,
          }
        })
    
      return data;
    }
}
