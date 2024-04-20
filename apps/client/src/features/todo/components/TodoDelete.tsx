import { useState } from "react";
import { useTodos } from "../hook";
import { DeleteOutlined } from '@ant-design/icons';
import { Duty } from "@repo/common";
import { Modal } from "antd";



interface TodoDeleteProps {
    todo: Duty;
}
const TodoDelete = ({ todo }: TodoDeleteProps) => {
    const { deleteTodo } = useTodos();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleDelete = async () => {
        todo.id && await deleteTodo(todo.id);
        setIsModalVisible(false);
    }

    return (
        <>
            <Modal 
                title="Delete Todo"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onOk={handleDelete}
                okText="Delete"
                okButtonProps={{ danger: true }}
            >
                Are you sure you want to delete this todo?
            </Modal>
            <DeleteOutlined color="red" onClick={
                () => {
                    setIsModalVisible(true)
                }
            }/>
        </>
    );
} 

export default TodoDelete;