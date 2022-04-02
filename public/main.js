console.log('请求了main.js')
//之前在index.html里请求style.css <link rel="stylesheet" href="/style.css">
//现在在js里请求
//请求css
getCSS.onclick = () => {
    const newRequest = new XMLHttpRequest();
    newRequest.open('GET', '/style.css')//获取资源GET
    newRequest.onload = () => {
        // console.log('newRequest.response')
        // console.log(newRequest.response)
        const style = document.createElement('style')//创建一个style标签，插入head里
        style.innerHTML = newRequest.response
        document.head.appendChild(style)
        //<style>h1{
        //     color: red;
        // }</style>位于<head></head>里
    }
    newRequest.onerror = () => {
        console.log("失败")
    }
    newRequest.send()
}
//请求js，之前是<script src="/main.js"></script>
getJS.onclick = () => {
    //1.创建HttpRequest对象（全称是XMLHttpRequest）
    const newRequest = new XMLHttpRequest();
    // console.log('newRequest.readyState--2')--0
    // console.log(newRequest.readyState)
//2.调用open方法
    newRequest.open('GET', '/2.js')//获取资源GET  readyState=1
    // console.log('newRequest.readyState--3')--1
    // console.log(newRequest.readyState)
//3.监听对象的onload&onerror
    newRequest.onreadystatechange = () => {
        //下载成功--4，但不知道成功还是失败，此时用status判断
        if (newRequest.readyState === 4) {
            //console.log("下载成功")不管成功失败都会输出
            if (newRequest.status >= 200 && newRequest.status < 300) {
                //2开头表示成功
                const script = document.createElement('script')//创建一个script标签，插入head里
                script.innerHTML = newRequest.response
                document.body.appendChild(script)
            } else {
                alert('加载js失败')
            }

        }

        // console.log(newRequest.readyState)
        // console.log('newRequest.response')
        // console.log(newRequest.response)

        // console.log('newRequest.readyState--4')
        // console.log(newRequest.readyState)
        //从2变到3变到4
    }
    // newRequest.onerror=()=>{
    //     console.log("失败")
    // }
//专业前端会改用onreadystatechange
//在事件处理函数里操作CSS文件内容
//4.调用对象的send方法（发送请求）
//     console.log('newRequest.readyState--5')--1
//     console.log(newRequest.readyState)
    newRequest.send()// readyState=2
    // console.log('newRequest.readyState--6')--1
    // console.log(newRequest.readyState)
}
//请求html,轻量级请求！！
getHTML.onclick = () => {
    const newRequest = new XMLHttpRequest();
    newRequest.open('GET', '/3.html')//路径错误，响应失败
    newRequest.onload = () => {
        // console.log('newRequest.response')
        // console.log(newRequest.response)
        const div = document.createElement('div')
        div.innerHTML = newRequest.response
        document.body.appendChild(div)
    }
    newRequest.onerror = () => {//并没有很好匹配AJAX,

    }
    newRequest.send()
}
//请求xml
getXML.onclick = () => {
    const newRequest = new XMLHttpRequest()
    newRequest.open('GET', '/4.xml')
    newRequest.onreadystatechange = () => {
        if (newRequest.readyState === 4) {
            //console.log("下载成功")不管成功失败都会输出
            if (newRequest.status >= 200 && newRequest.status < 300) {
                //2开头表示成功
                const dom = newRequest.responseXML
                const text = dom.getElementsByTagName('warning')[0].textContent
                console.log(text.trim())
            } else {
                alert('加载XML失败')
            }

        }
    }
    newRequest.send()
}
//请求JSON
getJSON.onclick = () => {
    const newRequest = new XMLHttpRequest()
    newRequest.open('GET', '/5.json')
    newRequest.onreadystatechange = () => {
        if (newRequest.readyState === 4) {
            //console.log("下载成功")不管成功失败都会输出
            if (newRequest.status >= 200 && newRequest.status < 300) {
                //2开头表示成功
                // console.log(newRequest.response)是字符串。怎么变成对象呢？
                const object=JSON.parse(newRequest.response)
                // console.log(typeof object) object对象
                // console.log(object)
                mySpan.textContent=object.name
            } else {
                alert('加载json失败')
            }

        }
    }
    newRequest.send()

}
let n=1
//请求下一页
getPage.onclick = () => {
    const newRequest = new XMLHttpRequest()

    newRequest.open('GET', `/page${n+1}`)

    newRequest.onreadystatechange = () => {
        if (newRequest.readyState === 4) {
            //console.log("下载成功")不管成功失败都会输出
            if (newRequest.status >= 200 && newRequest.status < 300) {
                //2开头表示成功
                // console.log(newRequest.response)
                const arr=JSON.parse(newRequest.response)
                arr.forEach(item =>{
                    const li=document.createElement('li')
                    li.textContent=item.id
                    xxx.appendChild(li)
                })
                n+=1
            } else {
                alert('加载下一页失败')
            }

        }
    }
    newRequest.send()

}