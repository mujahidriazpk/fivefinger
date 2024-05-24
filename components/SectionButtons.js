import React from "react";
import Image from "next/image";

const sectionButtons = (props) => {
    return (
        <div>
            <div className="max-w-2xl py-4 text-lg leading-normal">
                <div className="grid gap-5 grid-cols-3">
                    <Image
                        src={props.emoji}
                        className="flex m-auto"
                        alt="Hero Illustration"
                        loading="eager"
                        placeholder="blur"
                    />
                    
                    <button type="button" className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">
                    {props.buttonText}</button>
                    <Image
                        src={props.emoji}
                        className="flex m-auto"
                        alt="Hero Illustration"
                        loading="eager"
                        placeholder="blur"
                    />
                </div>
            </div>
        </div>

    );
}

export default sectionButtons;