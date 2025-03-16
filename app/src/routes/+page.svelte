<script lang="ts">
  import Navbar from "../components/Navbar.svelte";
  import Hero from "../components/Hero.svelte";
  import TopMangaLayout from "../components/layouts/TopMangaLayout.svelte";

  const mangaList = [
    {
      id: 1,
      title: "One Piece",
      image: "https://jumpg-assets.tokyo-cdn.com/secure/title/100140/title_thumbnail_portrait_list/326451.jpg?hash=nYvWfNjfa4kw58G27Ip4zQ&expires=2145884400",
      rating: 4.8,
      description:
        "Petualangan Monkey D. Luffy dan kru Topi Jerami dalam mencari One Piece.",
    },
    {
      id: 2,
      title: "Attack on Titan",
      image: "https://upload.wikimedia.org/wikipedia/id/d/d6/Shingeki_no_Kyojin_manga_volume_1.jpg",
      rating: 4.7,
      description:
        "Manusia berjuang melawan raksasa pemakan manusia untuk bertahan hidup.",
    },
    {
      id: 3,
      title: "Naruto",
      image: "https://jumpg-assets.tokyo-cdn.com/secure/title/100018/title_thumbnail_portrait_list/313318.jpg?hash=vfQSOC-bbvsLAZyU8YSiQw&expires=2145884400", 
      rating: 4.6,
      description:
        "Kisah Naruto Uzumaki yang bercita-cita menjadi Hokage di desanya.",
    },
  ];
</script>

<main>
  <Navbar />
  <Hero/>
  <TopMangaLayout mangaList={mangaList} />
</main>

