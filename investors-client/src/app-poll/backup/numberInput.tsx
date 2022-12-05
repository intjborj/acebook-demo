import React, { useState } from 'react'
import { toast } from 'react-toastify';

type Props = {
    value?: any;
    votesAvailableOrg?: number;
    votesAvailable?: number;
}

const NumberInput = ({ value, votesAvailableOrg = 0, votesAvailable = 0 }: Props) => {

    const [valueInput, setValue] = useState<number>(0)

    const setterProcess = (data: number) => {
        setValue(data)
        if (value) { value(data) }
    }

    const setterProcessCondition = (data: number) => {
        // if (newVal <= votesAvailableOrg &&( (votesAvailable == 0 && newVal < valueInput) || newVal < votesAvailable)) {
            // let testVotes = votesAvailable - data
            console.log("###")
            // let testVotes1 = votesAvailableOrg - votesAvailable 
            let testVotes1 = votesAvailable - data 
            console.log("testVotes", testVotes1)
            // let testVotes2 = votesAvailable + data 
           
            // testVotes = testVotes - data
            // console.log("testVotes plus", testVotes)
            
            // console.log("###")
            // let testVotes = votesAvailableOrg - votesAvailable 
            // console.log("testVotes", testVotes)
            // testVotes = testVotes - data
            // console.log("testVotes plus", testVotes)
            
        console.log("---")
        console.log("data", data)
        console.log("valueInput", valueInput)
        console.log("votesAvailableOrg", votesAvailableOrg)
        console.log("votesAvailable", votesAvailable)
        // console.log("testVotes", testVotes)
        console.log("---")
        // if (data <= votesAvailableOrg && votesAvailable != 0 || votesAvailable >= data) {
      
        if (data <= votesAvailableOrg && votesAvailable > 0) {
        // if (data <= votesAvailableOrg && testVotes <= votesAvailableOrg) {
            // setValue(newVal)
            // if (value) { value(newVal) }
            setterProcess(data)
            console.log("1")
        } else {

            if (data < valueInput) {
                console.log("2")
                // setValue(newVal)
                // if (value) { value(newVal) }
                setterProcess(data)
            } else {
                toast.error("Vote reached limits")
            }

        }
    }

    const handleChangeButton = (type: string) => {
        let newValue = valueInput;

        if (type === "add") {
            newValue = newValue + 1
        } else if (type === "minus") {
            newValue = newValue - 1
        }


        // setValue(newValue)
        // if (value) { value(newValue) }
        setterProcessCondition(newValue)

    }


    const handleChange = (valueTarget: number) => {

        let getValString = valueTarget.toString()
        let newVal = 0
        if (valueTarget) {
            newVal = +getValString
        } else {
            newVal = 0
        }

        setterProcessCondition(newVal)


    }




    return (
        <div className="custom-number-input h-10 w-32">
           
            {/* <label for="custom-input-number" class="w-full text-gray-700 text-sm font-semibold">Counter Input
            </label> */}
            <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                <button data-action="decrement" onClick={() => valueInput != 0 ? handleChangeButton("minus") : {}} className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                    <span className="m-auto text-2xl font-thin">−</span>
                </button>
                <input type="number" onChange={(e: any) => handleChange(e.target.value)} value={Number(valueInput).toString()} min={0} className="border-transparent focus:border-transparent focus:ring-0 border-0 focus:border-0 focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none" name="custom-input-number"></input>
                <button data-action="increment" onClick={() => handleChangeButton("add")} className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                    <span className="m-auto text-2xl font-thin">+</span>
                </button>
            </div>
        </div>
    )
}

export default NumberInput