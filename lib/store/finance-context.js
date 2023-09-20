"use client"
import { createContext, useState, useEffect } from "react";
//firebase imports
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";

// This context provides access to income and expenses data from Firebase Firestore.
export const financeContext = createContext({
    income: [],
    expenses: [],
    addIncomeItem: async () => { },
    removeIncomeItem: async () => { }
});

function FinanceContextProvider({ children }) {
    const [income, setIncome] = useState([]);
    const [expenses, setExpenses] = useState([]);

    // Function to add an income item to Firebase Firestore.
    const addIncomeItem = async (newIncome) => {
        const collectionRef = collection(db, "income");

        try {
            const docSnap = await addDoc(collectionRef, newIncome);

            // UpdateState
            setIncome([...income, {
                id: docSnap.id,
                ...newIncome,
            }]);

        } catch (error) {
            console.log(error.message);
            throw error;
        }
    };

    // Function to remove an income item from Firebase Firestore.
    const removeIncomeItem = async (incomeId) => {
        const docRef = doc(db, "income", incomeId);
        try {
            await deleteDoc(docRef);
            setIncome(income.filter((i) => i.id !== incomeId));
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    };

    const values = { income, expenses, addIncomeItem, removeIncomeItem };
    useEffect(() => {
        // Function to get income data from Firebase Firestore.
        const getIncomeData = async () => {
            const collectionsRef = collection(db, "income");
            const docsSnap = await getDocs(collectionsRef);

            const data = docsSnap.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data(),
                };
            });
            setIncome(data);
        };

        // Function to get expense data from Firebase Firestore.
        const getExpensesData = async () => {
            const collectionRef = collection(db, "expenses");
            const docsSnap = await getDocs(collectionRef);
            const data = docsSnap.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data(),
                };
            });
            setExpenses(data);
        };
        getExpensesData();
        getIncomeData();
    }, []);

    return (
        <financeContext.Provider value={values}>
            {children}
        </financeContext.Provider>
    );
}

export default FinanceContextProvider;
