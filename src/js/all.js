// 1. render default data 
// 2. filter "search" item = > render data + show search num
// 3. add new data: valid value (item =="" or star > 10 ||star < 0) => add data ==> render data 

const data = [
    {
      id: 0,
      name: "肥宅心碎賞櫻3日",
      imgUrl:
        "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
      area: "高雄",
      description: "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
      group: 87,
      price: 1400,
      rate: 10,
    },
    {
      id: 1,
      name: "貓空纜車雙程票",
      imgUrl:
        "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
      area: "台北",
      description:
        "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
      group: 99,
      price: 240,
      rate: 2,
    },
    {
      id: 2,
      name: "台中谷關溫泉會1日",
      imgUrl:
        "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
      area: "台中",
      description:
        "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
      group: 20,
      price: 1765,
      rate: 7,
    },
  ];

const result = document.querySelector(".result")
// console.log(result)

let searchNum = 0;

// init render data 
function render(status){
 let str =""
 data.forEach(item =>{

    // id: 1,
    //   name: "貓空纜車雙程票",
    //   imgUrl:
    //     "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    //   area: "台北",
    //   description:
    //     "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
    //   group: 99,
    //   price: 240,
    //   rate: 2,
    let structure = `
    <li
                class="relative mt-3 w-350 flex flex-col justify-between rounded shadow-3"
              >
                <p
                  class="absolute -top-3 left-0 bg-forest-100 px-5 py-2 text-white rounded-r-lg"
                >
                  ${item.area}
                </p>
                <div class="">
                  <img
                    src="${item.imgUrl}"
                    onerror="this.onerror=null;this.src='./images/no_found.png';"
                    class="w-full h-[180px] object-cover mb-5 rounded"
                  />
                  <article class="relative px-5">
                    <p
                      class="absolute -top-9 left-0 bg-primary text-white py-1 px-2"
                    >
                      ${item.rate}
                    </p>
                    <h2
                      class="font-medium text-2xl pb-1 border-b-2 border-b-forest-200 mb-4"
                    >
                      ${item.name}
                    </h2>
                    <p class="text-secondary">
                      ${item.description}
                    </p>
                  </article>
                </div>
                <div class="flex justify-between items-center mt-6 mb-4 px-5">
                  <h3 class="font-medium flex items-center">
                    <span class="material-icons mr-1"> error </span>
                    剩下最後 ${item.group} 組
                  </h3>
                  <p class="font-medium flex items-center">
                    TWD
                    <span class="text-3.5xl ml-1"> $${item.price} </span>
                  </p>
                </div>
              </li>
    `
    if (status === "全部地區"){
        str += structure
        searchNum += 1
    }else if (status === item.area){
        str += structure
        searchNum += 1
    }
 })
 result.innerHTML = str
 
}
render("全部地區")


// filter search 
// filter.value  :本次搜尋共 ${searchNum} 筆資料

const filter = document.querySelector(".filter")
const searchText = document.querySelector(".searchText")


filter.addEventListener("change",(event) => {
    searchNum = 0;
    render(filter.value)
    let filterText = `本次搜尋共 ${searchNum} 筆資料`
    searchText.textContent = filterText
})

// add new data 
const addBtn = document.querySelector(".btn")

const name =  document.querySelector("#pkgName")
const imgUrl =  document.querySelector("#pkgUrl")
const area =  document.querySelector("#pkgArea")
const description =  document.querySelector("#pkgDescr")
const group =  document.querySelector("#pkgNum")
const price =  document.querySelector("#pkgPrice")
const rate =  document.querySelector("#pkgStar")
// console.log(name)
const elements = [name,imgUrl, area, description, group, price, rate]
// console.log(elements)
const submitForm = document.querySelector("form")

addBtn.addEventListener("click", (event) => {
    let allInputValue = []
    elements.forEach(item => {
        allInputValue.push(item.value)
    })
    // console.log(allInputValue[6])
    if (allInputValue.some(item => item === "")){
        alert("please enter valid information")
        return
    }else if (allInputValue[6] >10 || allInputValue[6] <0){
        alert("please enter number 1 to 10")
        return
    }else {
        allInputValue.unshift(data.length)
        // console.log(allInputValue)
        let objKeys = ["id", "name","imgUrl", "area", "description", "group", "price", "rate"]

        const obj = objKeys.reduce((accumulator, item, index) => {
            return {...accumulator, [item]:allInputValue[index]}
        },{})
        // console.log(obj)
        data.push(obj)
        render("全部地區")
        submitForm.reset()

    }
})


// id: 1   
    //   name: "貓空纜車雙程票",
    //   imgUrl:
    //     "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    //   area: "台北",
    //   description:
    //     "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
    //   group: 99,
    //   price: 240,
    //   rate: 2,



// `
// <li
//                 class="relative mt-3 w-350 flex flex-col justify-between rounded-t shadow-3"
//               >
//                 <p
//                   class="absolute -top-3 left-0 bg-forest-100 px-5 py-2 text-white rounded-r-lg"
//                 >
//                   台北
//                 </p>
//                 <div class="">
//                   <img
//                     src="./images/travel_1.png"
//                     alt="travel pic"
//                     class="h-[180px] object-cover mb-5"
//                   />
//                   <article class="relative px-5">
//                     <p
//                       class="absolute -top-9 left-0 bg-primary text-white py-1 px-2"
//                     >
//                       8.6
//                     </p>
//                     <h2
//                       class="font-medium text-2xl pb-1 border-b-2 border-b-forest-200 mb-4"
//                     >
//                       綠島自由行套裝行程
//                     </h2>
//                     <p class="text-secondary">
//                       嚴選超高CP值綠島自由行套裝行程，多種綠島套裝組合，提供台東綠島來回船票、綠島環島機車、綠島民宿住宿，行程加贈『綠島浮潛體驗』以及『綠島生態導覽』，讓你用輕鬆的綠島套裝自由行，也能深度認識綠島在地文化。
//                     </p>
//                   </article>
//                 </div>
//                 <div class="flex justify-between items-center mt-6 mb-4 px-5">
//                   <h3 class="font-medium flex items-center">
//                     <span class="material-icons mr-1"> error </span>
//                     剩下最後 8 組
//                   </h3>
//                   <p class="font-medium flex items-center">
//                     TWD
//                     <span class="text-3.5xl ml-1"> $1,280 </span>
//                   </p>
//                 </div>
//               </li>
// `