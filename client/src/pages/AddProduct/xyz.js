

variation ={
    "set-bookset_notebookset": {
        "stream-pcm":{
            "opt-music": {

            },
            "opt-english": {

            },
        },
        "stream-pcb":{

        },
        "stream-commerce":{

        },
    },
    "set-notebookset": {

    }

}

const findallkeys = (obj) => {
    let keys = [];
    // for (let key in obj) {
    //     keys.push(key);
    //     if (typeof obj[key] === 'object') {
    //         let subkeys = findallkeys(obj[key]);
    //         keys = keys.concat(subkeys.map((subkey) => key + '-' + subkey));
    //     }
    // }

    for (let key in obj) {
        keys.push(key.split('-')[1]);
        
    }
    // set of keys
    return  new Set(keys);
}

console.log(findallkeys(variation['set-bookset_notebookset'])); 

var selectedData={
    image:
    
}      


const comp = (variation,onchange ,value) => {
    
    var name = "set-bookset_notebookset";
    var keys= [];
    var selectedKey = name;
    const func = (obj) => {
        selectedKey=obj;
        onchange({name:selectedKey});
    }

    // return {
    //     <div>
    //         choose {name}
    //         {keys.map((key) => {
    //             return <button onClick={func(key)} isSelected= {name==key}>{key}</button>
    //         })}

    //         <comp variation = {variation[selectedKey]} onchange = {onchange}/>
    //     </div>
    // }
}   