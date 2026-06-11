import {  Link, useNavigate } from "react-router-dom";
import { useUserData } from "../context/UserContext";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useSongData } from "../context/SongContext";
import axios from "axios";
import toast from "react-hot-toast";


const server = "http://18.61.166.97:9090";


const Admin = () => {
  const navigate = useNavigate();
  const { user } = useUserData();
  const { albums, songs, fetchAlbums, fetchSongs } = useSongData();
  const [title, setTitle] = useState<string>("");
  const [albumTitle, setAlbumTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [albumDescription, setAlbumDescription] = useState<string>("");
   const [albumBtnLoading, setAlbumBtnLoading] = useState<boolean>();
  const [album, setAlbum] = useState<string>("");
    const [albumFile, setAlbumFile] = useState<File | null>(null);
const fileInputRef = useRef<HTMLInputElement | null>(null);
const fileSInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [btnLoading, setBtnLoading] = useState<boolean>();

  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };
  const albumFileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setAlbumFile(selectedFile);
  };
  const addAlbumHandler = async (e:  React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!albumFile) return;

    const formData = new FormData();
    formData.append("title", albumTitle);
    formData.append("description", albumDescription)
    formData.append("image", albumFile);

    setAlbumBtnLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/api/v1/admin/album/new`,
        formData,
        { headers: { token: localStorage.getItem("token") } },
      );

      toast.success(data.message);
      fetchAlbums();
      setAlbumBtnLoading(false);
      setAlbumFile(null);
      setAlbumTitle("");
      setAlbumDescription("");
         if (fileInputRef.current) {
  fileInputRef.current.value = "";
}
    } catch (err: any) {
      console.log(err);
      toast.error(err.response?.data?.message || "An error occured");
      setAlbumBtnLoading(false);
    }
  };

  const addSongHandler = async (e:  React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", file);
    formData.append("album", album);

    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/v1/admin/song/new`, formData, {
        headers: { token: localStorage.getItem("token") },
      });

      toast.success(data.message);
      fetchSongs();
      setBtnLoading(false);
      setFile(null);
      setTitle("");
      setDescription("");
      setAlbum("");
              if (fileSInputRef.current) {
  fileSInputRef.current.value = "";
}
   
    } catch (err: any) {
      console.log(err);
      toast.error(err.response?.data?.message || "An error occured");
      setBtnLoading(false);
    }
  };

  const addThumbnailHandler = async (id: string) => {
    if (!file) return;

    const formData = new FormData();

    formData.append("image", file);

    setBtnLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/api/v1/admin/song/thumbnail/${id}`,
        formData,
        { headers: { token: localStorage.getItem("token") } },
      );

      toast.success(data.message);
      fetchSongs();
      setBtnLoading(false);
      setFile(null);
    } catch (err: any) {
      console.log(err);
      toast.error(err.response?.data?.message || "An error occured");
      setBtnLoading(false);
    }
  };
  const deleteAlbum = async (id: string) => {
    if (confirm("Are you sure you want to delete this album?")) {
      setBtnLoading(true);
      try {
        const { data } = await axios.delete(
          `${server}/api/v1/admin/album/delete/${id}`,
          { headers: { token: localStorage.getItem("token") } },
        );
        toast.success(data.success);
        fetchAlbums();
        fetchSongs();
        setBtnLoading(false);
      } catch (err: any) {
        toast.error(err.response?.data?.message || "an error occured");
      }
    }
  };
  const deleteSong = async (id: string) => {
    if (confirm("Are you sure you want to delete this song?")) {
      setBtnLoading(true);
      try {
        const { data } = await axios.delete(
          `${server}/api/v1/admin/song/delete/${id}`,
          { headers: { token: localStorage.getItem("token") } },
        );
        toast.success(data.success);
        fetchAlbums();
        fetchSongs();
        setBtnLoading(false);
      } catch (err: any) {
        toast.error(err.response?.data?.message || "an error occured");
      }
    }
  };
  useEffect(() => {
    if (user && user.role != "admin") navigate("/");
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-[#212121] text-white p-8">
      <Link
        to={"/"}
        className="bg-green-500 text-white font-bold py-2 px-4 rounded-full"
      >
        Go to home page
      </Link>
      <h2 className="text-2xl mt-6 font-bold mb-6 ">Add Album</h2>
      <form
        onSubmit={addAlbumHandler}
        className="bg-[#181818] p-6 rounded-lg shadow-lg flex flex-col justify-center items-center gap-4 "
      >
        <input
          className="w-full p-3 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:border-gray-500 "
          type="text"
          placeholder="Title"
          onChange={(e) => setAlbumTitle(e.target.value)}
          value={albumTitle}
          required
        />
        <input
          className="w-full p-3 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:border-gray-500 "
          type="text"
          placeholder="Description"
          onChange={(e) => setAlbumDescription(e.target.value)}
          value={albumDescription}
          required
        />
        <input
          className="w-full p-3 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:border-gray-500 "
          type="file"
          ref={fileInputRef}
          placeholder="Choose image"
          onChange={albumFileChangeHandler}
          accept="image/*"
          required
        />
        <button
          disabled={albumBtnLoading}
          className="w-25 bg-green-500 hover:bg-green-400 text-black p-3 font-semibold rounded-full cursor-pointer"
        >
          {" "}
          {albumBtnLoading ? "please wait..." : "Add"}
        </button>
      </form>

      <h2 className="text-2xl mt-6 font-bold mb-6 ">Add Song</h2>
      <form
        onSubmit={addSongHandler}
        className="bg-[#181818] p-6 rounded-lg shadow-lg flex flex-col justify-center items-center gap-4 "
      >
        <input
          className="w-full p-3 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:border-gray-500 "
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />
        <input
          className="w-full p-3 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:border-gray-500 "
          type="text"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          required
        />
        <select
          className="w-full p-3 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:border-gray-500 "
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
          required
        >
          <option value="">Choose Album</option>
          {albums?.map((e: any, i: number) => {
            return (
              <option value={e.id} key={i}>
                {e.title}
              </option>
            );
          })}
        </select>
        <input
          className="w-full p-3 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:border-gray-500 "
          type="file"
          placeholder="Choose Thumbnail"
          onChange={fileChangeHandler}
          accept="audio/*"
          ref={fileSInputRef}
          required
        />

        <button
          disabled={btnLoading}
          className="w-25 bg-green-500 hover:bg-green-400 text-black p-3 font-semibold rounded-full cursor-pointer"
        >
          {" "}
          {btnLoading ? "please wait..." : "Add"}
        </button>
      </form>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Added Albums</h3>
        <div className="flex justify-center md:justify-start gap-2 items-center flex-wrap ">
          {albums?.map((e, i) => {
            return (
              <div className="bg-[#181818] p-4 rounded-lg shadow-md" key={i}>
                <img src={e.thumbnail} className="w-52 h-52 mr-1" alt="" />
                <h4 className="text-lg font-bold">{e.title.slice(0, 30)}...</h4>
                <h4 className="text-lg font-bold">
                  {e.description.slice(0, 20)}...
                </h4>
                <button
                  disabled={btnLoading}
                  onClick={() => deleteAlbum(e.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  <i className="ri-delete-bin-line"></i>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Added Songs</h3>
        <div className="flex justify-center md:justify-start gap-2 items-center flex-wrap ">
          {songs?.map((e, i) => {
            return (
              <div className="bg-[#181818] p-5 rounded-lg shadow-md" key={i}>
                {e.thumbnail ? (
                  <img src={e.thumbnail} className="w-52 h-52 mr-1" alt="" />
                ) : (
                  <div className="flex w-75 flex-col gap-2 justify-center items-center">
                    <input type="file" onChange={fileChangeHandler} />
                    <button
                      className="w-30 bg-green-500 hover:bg-green-400 text-black px-2 py-1 font-semibold rounded-full cursor-pointer"
                      onClick={() => addThumbnailHandler(e.id)}
                    >
                      {btnLoading ? "please wait" : "Add Thumbnail"}{" "}
                    </button>
                  </div>
                )}
                <h4 className="text-lg font-bold">{e.title.slice(0, 30)}...</h4>
                <h4 className="text-lg font-bold">
                  {e.description.slice(0, 20)}...
                </h4>
                <button
                  disabled={btnLoading}
                  onClick={() => deleteSong(e.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  <i className="ri-delete-bin-line"></i>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Admin;
