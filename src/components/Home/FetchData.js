


export default async function fetchData(e){
    const response = await fetch(`https://connected-c86f2-default-rtdb.firebaseio.com/userdata/${e}.json`)
    const data = await response.json();

const loadedData = [];
 for(const key in data){
     loadedData.push({
         id:key,
         name:data[key].name,
         lastname:data[key].lastname,
         file:data[key].file
     })
 }
 //props.userData(loadedData[0])
}
