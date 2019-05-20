/*
why test?
save time,
give facilities o developers
create reliable software,
refactoring
collabrating
peace of mind
*/
const {tipp,fahrenheitToCelsius,celsiusToFahrenheit,add}=require('./math')
test('Frst test',()=>{
    const total=tipp(10,.3)
    expect(total).toBe(13)
})
test('Should convert 32 F to 0 C',()=>{
const result=   fahrenheitToCelsius(32)
expect(result).toBe(0)
})
test('Should convert 0 C to 32 F',()=>{
   const farenhit= celsiusToFahrenheit(0)
   expect(farenhit).toBe(32)
})
// test('Async function testing',(done)=>{
// setTimeout(()=>{
//     expect(2).toBe(1)
//     done()
// },2000)
// })
test('async-await',(done)=>{
    add(2,3).then((result)=>{
        expect(result).toBe(5)
        done()
    })
        
})

test('async',async()=>{
    result=await add(2,3)
    expect(result).toBe(5)
})

