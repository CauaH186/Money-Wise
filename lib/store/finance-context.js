"use client"

import { createContext, useState, useEffect } from "react";
//firebase imports
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";

export const financeContext = createContext({
    income: [],
    expenses: [],
    addIncomeItem: async () => { },
    removeIncomeItem: async () => { }
})

function FinanceContextProvider({ children }) {
    const [income, setIncome] = useState([])
    const [expenses, setExpenses] = useState([])
    const addIncomeItem = async (newIncome) => {
        const collectionRef = collection(db, 'income')

        try {
            const docSnap = await addDoc(collectionRef, newIncome)

            // UpdateState
            setIncome(prevState => {
                return [
                    ...prevState,
                    {
                        id: docSnap.id,
                        ...newIncome,
                    }
                ]
            })

        } catch (error) {
            console.log(error.message);
            throw error
        }
    }
    const removeIncomeItem = async (incomeId) => {
        const docRef = doc(db, 'income', incomeId)
        try {
            await deleteDoc(docRef)
            setIncome((prevState) => {
                return prevState.filter((i) => i.id !== incomeId)
            })
        } catch (error) {
            console.log(error.message);
            throw error
        }
    }

    const values = { income, expenses, addIncomeItem, removeIncomeItem }

    useEffect(() => {
        const getIncomeData = async () => {
            const collectionsRef = collection(db, 'income')
            const docsSnap = await getDocs(collectionsRef)


            const data = docsSnap.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data(),

                }
            })
            setIncome(data)
        }

        const getExpensesData = async () => {
            const collectionRef = collection(db, 'expenses')
            const docsSnap = await getDocs(collectionRef)
            const data = docsSnap.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            })
            setExpenses(data)
        }
        getExpensesData();
        getIncomeData();
    }, [])

    return (
        <financeContext.Provider value={values}>
            {children}
        </financeContext.Provider>
    )
}

export default FinanceContextProvider
