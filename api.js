let url = 'https://covid19.ddc.moph.go.th/api/Cases/today-cases-all'
let data

function addTag(label,content) {
    let p = document.createElement('p')
    p.innerText = `${label} : ${content}`
    document.body.appendChild(p)
}

(async () =>{
    try{
    const resp =  await fetch(url)
    d = await resp.json()
    data = d[0]
    for (keys in data){
        addTag(`${keys}`,`${data[keys]}`)
    }
    }catch(err) {console.error(`incomplete fetch ${err}`)}
})()


let jsd5 = {
 number : 64,
 name : 'Wuttipat',
 ชื่อเล่น : 'โอปอ',
 rank: {
    skill1 : 'ตึง',
    skill2 : 'ตึงเกินต้าน'
 }
}
console.log(jsd5);

const randomNums = [1, 123, 25, 90, 3543, 42];

const foundElement = randomNums.findIndex(num => num > 400);

console.log(foundElement)