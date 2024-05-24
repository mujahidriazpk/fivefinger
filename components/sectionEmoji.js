import React from "react";
import Image from "next/image";

const Emoji = (props) => {
    return (
        <div>
            <div className="max-w-2xl py-4 text-lg m-auto">
                <div className="grid gap-10 grid-cols-3 items-center">
                    <Image
                        src={props.emoji}
                        className="flex m-auto"
                        width={110}
                        height={110}
                        alt="Hero Illustration"
                        loading="eager"
                    />
                    
                    <button type="button" className="h-[40px] items-center text-white bg-[#F4660F] hover:bg-[#F4660F] focus:ring-4 focus:bg-[#F4660F] font-medium rounded-sm text-lg px-6 py-2 me-2 mb-2 dark:focus:ring-yellow-900">
                    {props.buttonText}</button>
                    <Image
                        src={props.emoji}
                        className="flex m-auto"
                        width={110}
                        height={110}
                        alt="Hero Illustration"
                        loading="eager"
                    />
                </div>
            </div>
        </div>

    );
}

export default Emoji;