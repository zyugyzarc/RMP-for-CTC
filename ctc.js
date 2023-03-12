function main(){

    elements = document.querySelectorAll(
        "[id*=summary] > div > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12 > div > div.MuiGrid-root.css-geek62.MuiGrid-item.MuiGrid-grid-xs-12 > div > div > div > div.MuiGrid-root.MuiGrid-item.MuiGrid-zeroMinWidth.MuiGrid-grid-xs-12 > p > span:nth-child(2)"
    )

    elements.forEach(el=>{
        if(el.innerHTML === el.innerText){
            chrome.runtime.sendMessage(el.innerText, data=>{
                if(el.innerHTML === el.innerText){
                    console.log(data)
                    try{
                        el.innerHTML += `&nbsp;<a style="text-decoration: none; color: ${(data.numRatings>0)?(["red", "red", "orange", "green", "green", "green"][Math.floor(data.avgRating)]):"blue"};" target="_blank" href="https://www.ratemyprofessors.com/professor?tid=${data.legacyId}"><b>(${(data.numRatings>0)?data.avgRating:"?"})</b></a>`

                        
                    }catch(err){
                        el.innerHTML += `&nbsp;<a style="text-decoration: none; color: blue;">(?)</b></a>`
                    }
                }

            })
        }

        if(el.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children
            .length > 1 && 
            !el.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].children[0].children[0].children[1].children[1]
            .innerHTML.includes("<iframe")
            ){

            let container = document.createElement("div")
            container.style = "width: 100%; height: 45vh; overflow: hidden;"

            let frame = document.createElement("iframe")
            frame.src = el.children[0].href
            frame.style = "width: 100%; height: calc(100% + 100px); margin-top: -100px;"
            container.append(frame)
            

            el.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].children[0].children[0].children[1].children[1]
            .prepend(container)

        }
    })

    
    //console.log(data)
    //
}

setInterval(main, 500)