async function fetchData() {
  try {
    const pokimonName = document.getElementById("input").value.toLowerCase();

    const respons = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokimonName}`
    );

    if (!respons.ok) {
      throw new Error("Could not fetch resource");
    }
    const data = await respons.json();
     const imgData = data.sprites.front_default;
     const imgname = data.name;


    
    const imgElement = document.getElementById("pokimonSprites");
    imgElement.src = imgData;
    imgElement.style.display = "block";
    const imgName = document.getElementById("PokimonName");
    // imgName.innerText = ;
    imgName.innerHTML = JSON.stringify(imgname);


    console.log(data);
    
  } catch (error) {
    console.error(error);
  }
}
