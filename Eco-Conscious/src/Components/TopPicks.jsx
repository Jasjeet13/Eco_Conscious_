import React from "react";

const TopPicks = () => {
  const picks = [
    {
      imageUrl:
        "https://image.jimcdn.com/app/cms/image/transf/none/path/sbec91bf8c08a9a72/image/i76dd611f94e491c1/version/1553851215/image.png",
      title: "Organic Cotton Shirt",
      description: "Soft and comfortable shirt made from 100% organic cotton.",
    },
    {
      imageUrl:
        "https://th.bing.com/th?id=OIP.O_Gx8LEnPFw0rMxGEha6SgHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
      title: "Recycled Tote Bag",
      description: "Durable tote bag made from recycled materials.",
    },
    {
      imageUrl:
        "https://th.bing.com/th/id/OIP.DGnVmp-0aUa5EL9l7Ua1KAHaHa?w=210&h=210&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      title: "Bamboo Toothbrush",
      description: "Eco-friendly toothbrush with a bamboo handle.",
    },
    {
      imageUrl:
        "https://th.bing.com/th/id/R.4414333b37828ff48249bd4c022ce89f?rik=KqEsWIJW51lKew&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2fshoe-transparent-background%2fshoe-transparent-background-20.png&ehk=HBsdJ1UE5SZdpmHKraj%2bIqiVbq4QXTj0IWTAcm0pNqg%3d&risl=1&pid=ImgRaw&r=0",
      title: "Sustainable Shoes",
      description: "Stylish shoes made from sustainable materials.",
    },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Top Picks for You</h2>
      <div style={styles.grid}>
        {picks.map((pick, index) => (
          <div key={index} style={styles.item}>
            <img src={pick.imageUrl} alt={pick.title} style={styles.image} />
            <h3 style={styles.itemTitle}>{pick.title}</h3>
            <p style={styles.description}>{pick.description}</p>
            <button style={styles.button}>View More</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "97.5vw",
    padding: "20px",
    backgroundColor: "#fffff0",
    boxSizing: "border-box",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
    textAlign: "center",
    color: "#333",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
    width: "100%",
    maxWidth: "96%",
    margin: "0 auto",
    boxSizing: "border-box",
  },
  item: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "15px",
    textAlign: "center",
    boxSizing: "border-box",
  },
  image: {
    width: "100%",
    height: "auto",
    borderRadius: "8px",
  },
  itemTitle: {
    fontSize: "1.5rem",
    margin: "10px 0",
  },
  description: {
    fontSize: "1rem",
    color: "#666",
  },
  button: {
    marginTop: "10px",
    padding: "10px 20px",
    fontSize: "1rem",
    color: "black",
    fontWeight: "600",
    backgroundColor: "#ace1af",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default TopPicks;
