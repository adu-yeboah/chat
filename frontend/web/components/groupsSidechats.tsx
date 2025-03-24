import React, { useEffect, useState } from "react";
import Chatui from "./ui/chatui";
import { IoAddCircleOutline } from "react-icons/io5";
import { useGroup } from "@/utils/group";
import { useFlashMessage } from "flashmessage-js";

export default function GroupsSidechats() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const { createGroup, getGroups, getOnlineUsers, message, error, groups, onlineUsers } = useGroup();
  const { showFlashMessage } = useFlashMessage();

  useEffect(() => {
    getGroups();
    getOnlineUsers(); 
  }, []);

  useEffect(() => {
    if (message) showFlashMessage(message, "success");
    if (error) showFlashMessage(error, "error");
  }, [message, error]);

  const handleClick = () => setIsModalOpen(true);
  const handleClose = () => {
    setIsModalOpen(false);
    setGroupName("");
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!groupName.trim()) {
      showFlashMessage("Group name is required", "error");
      return;
    }
    try {
      await createGroup(groupName);
      await getGroups();
      handleClose();
    } catch (err) {
      // Error handled in useGroup
    }
  };

  return (
    <>
      <div className="w-1/4 bg-gray-800 p-4 border-r border-gray-700">
        <div className="flex items-center mb-4 justify-between">
          <h2 className="text-white text-2xl">Groups</h2>
          <IoAddCircleOutline
            onClick={handleClick}
            size={28}
            className="text-white cursor-pointer hover:text-gray-300"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          {Array.isArray(groups) && groups.length > 0 ? (
            groups.map((item) => <Chatui data={item} key={item.id} />)
          ) : (
            <h3 className="text-sm text-gray-400">Not in any group</h3>
          )}
          <div className="mt-4">
            <h3 className="text-sm text-gray-400">Online Users: {onlineUsers.length}</h3>
            <ul className="text-white">
              {onlineUsers.map((userId) => (
                <li key={userId}>{userId}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-[rgba(55,52,52,0.6)] flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <h3 className="text-white text-xl mb-4">Create a Group</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="groupName" className="text-gray-300 block mb-2">
                  Group Name
                </label>
                <input
                  id="groupName"
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="Enter group name"
                  className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
                  autoFocus
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}