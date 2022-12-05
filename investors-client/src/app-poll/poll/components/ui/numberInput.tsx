import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { POLL_ERROR_REACHED } from '../../constants/poll';

type Props = {
    value?: any;
    votesAvailableOrg?: number;
    votesAvailable?: number;
    reachLimit?: boolean;
    defaultValue: number;
}

const NumberInput = ({ value, votesAvailableOrg = 0, votesAvailable = 0, reachLimit, defaultValue }: Props) => {

    const [valueInput, setValue] = useState<number>(0)

    const setterProcess = (data: number) => {
        setValue(data)
        if (value) { value(data) }
    }

    const setterProcessCondition = (data: number) => {

        if (data <= votesAvailableOrg && votesAvailable > 0) {
            setterProcess(data)
        } else {

            if (data < valueInput) {
                setterProcess(data)
            } else {
                toast.error(POLL_ERROR_REACHED)
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

        setterProcessCondition(newValue)
    }


    const handleChange = (valueTarget: number) => {
        if (valueTarget >= 0) {

            let getValString = valueTarget.toString()
            let newVal = 0
            if (valueTarget) {
                newVal = +getValString
            } else {
                newVal = 0
            }

            if (reachLimit) {
                if (newVal <= votesAvailable) {
                    setterProcessCondition(newVal)
                } else {
                    setValue(defaultValue ?? 0)
                }
            } else {
                setterProcessCondition(newVal)
            }
        }
    }

    useEffect(() => {
        if (reachLimit) {
            setValue(defaultValue ?? 0)
            console.log("defaultValue", defaultValue)
        }
    }, [!reachLimit])






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