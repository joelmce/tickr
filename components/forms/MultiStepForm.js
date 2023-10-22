'use client'
import { useState } from "react";

export function Step1({ nextStep }) {
    const handleSubmit = (e) => {
        e.preventDefault()
        nextStep()
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Tell us about your dashboard.</h2>
            <label>
                Title
                <input name="name" type="text"/>
            </label>
            <label>
                Description
                <input name="description" type="text" placeholder="Optional"/>
            </label>
            <button type="submit">Next</button>
        </form>
    )
}

export function Step2({ prevStep, nextStep }) {
    const handleSubmit = (e) => {
        e.preventDefault()
        nextStep()
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Step 2</h2>
            <button onClick={prevStep}>Previous</button>
            <button type="submit">Next</button>
        </form>
    )
}

export function Step3({ prevStep }) {
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Step 3</h2>
            <button onClick={prevStep}>Previous</button>
            <button type="submit">Submit</button>
        </form>
    )
} 

export default function MultiStepForm() {
    const [step, setStep] = useState(1)
    console.log(step)

    const nextStep = () => {
        setStep(step + 1)
    }

    const prevStep = () => {
        setStep(step - 1)
    }

    switch (step) {
        case 1:
          return <Step1 nextStep={nextStep} />;
        case 2:
          return <Step2 prevStep={prevStep} nextStep={nextStep} />;
        case 3:
          return <Step3 prevStep={prevStep} />;
        default:
          return null;
      }
}