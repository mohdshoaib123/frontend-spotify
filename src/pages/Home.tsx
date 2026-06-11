import AlbumCard from "../components/AlbumCard";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import SongCard from "../components/SongCard";
import { useSongData } from "../context/SongContext";

function Home() {
  const { albums,songs,loading } = useSongData();

  return (
    <div>

      {loading? <Loading></Loading>:
      (
      <Layout>
        <div className="mb-4">
          <h1 className="my-5 font-bold text-2xl">featured charts</h1>
          <div className="flex overflow-auto">
            {albums?.map((e, i) => {
              return (
                <AlbumCard
                  key={i}
                  image={e.thumbnail}
                  name={e.title}
                  description={e.description}
                  id={e.id}
                />
              );
            })}
          </div>
        </div>
        
        <div className="mb-4">
          <h1 className="my-5 font-bold text-2xl">Today biggest's hits</h1>
          <div className="flex overflow-auto">
            {songs?.map((e, i) => {
              return (
                <SongCard
                  key={i}
                  image={e.thumbnail}
                  name={e.title}
                  des={e.description}
                  id={e.id}
                />
              );
            })}
          </div>
        </div>
      </Layout>)}
    </div>
  );
}

export default Home;
