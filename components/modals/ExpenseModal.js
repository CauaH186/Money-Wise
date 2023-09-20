import Modal from "@/components/Modal"

function ExpenseModal({ show, onClose }) {
    return (
        <Modal isOpen={show} onClose={onClose}>
            <h3>Hello World</h3>
        </Modal>
    )
}


export default ExpenseModal