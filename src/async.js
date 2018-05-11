const regularFunction = () => {
    return new Promise(r=>{
        setTimeout(()=>{
            r(123);
        },1000);
    });
}

const asyncFunction = async () => {
    let z = await regularFunction()
    return z;
}

asyncFunction().then(console.log);
