'use client';

import React, { useEffect, useState } from 'react';
import { DeleteModal } from '@/commonComponents/DeleteModal';
import { EditDrawer } from '@/commonComponents/EditDrawer';
import Image from 'next/image';
import Button from '@/commonComponents/Button';
import { useRouter } from 'next/navigation';

export default function WorkSpaceComponent() {
  const router = useRouter();
  const [workspaces, setWorkspaces] = useState([]);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    workspace: null,
    isDeleting: false
  });
  const [editDrawer, setEditDrawer] = useState({
    isOpen: false,
    workspace: null,
    isUpdating: false
  });

  useEffect(() => {
    const stored = localStorage.getItem("data");
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        setWorkspaces(parsed);
      }
    } catch (e) {
      console.error("Failed to parse workspaces from localStorage", e);
    }
  }, []);

  const handleDeleteClick = (workspace) => {
    setDeleteModal({
      isOpen: true,
      workspace,
      isDeleting: false
    });
  };

  const handleDeleteConfirm = async () => {
    setDeleteModal(prev => ({ ...prev, isDeleting: true }));

    await new Promise(resolve => setTimeout(resolve, 1500));

    const updated = workspaces.filter(w => w.id !== deleteModal.workspace.id);
    setWorkspaces(updated);
    localStorage.setItem("data", JSON.stringify(updated));

    setDeleteModal({ isOpen: false, workspace: null, isDeleting: false });
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, workspace: null, isDeleting: false });
  };

  const handleEditClick = (workspace) => {
    setEditDrawer({
      isOpen: true,
      workspace,
      isUpdating: false
    });
  };

  const handleEditUpdate = async (updatedWorkspace) => {

    setEditDrawer(prev => ({ ...prev, isUpdating: true }));

    await new Promise(resolve => setTimeout(resolve, 1500));

    const updated = workspaces.map(w =>
      w.id === updatedWorkspace.id ? updatedWorkspace : w
    );
    setWorkspaces(updated);
    localStorage.setItem("data", JSON.stringify(updated));

    setEditDrawer({ isOpen: false, workspace: null, isUpdating: false });
  };

  const handleEditCancel = () => {
    setEditDrawer({ isOpen: false, workspace: null, isUpdating: false });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handelNavigate = () => {
    router.push('/');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className='flex flex-row justify-between items-center'>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Workspace Table</h1>
          <p className="text-gray-600">Manage your workspaces and team collaboration</p>
        </div>
        <Button
          className='w-[200px] bg-[#7B68EE] text-white hover:bg-[#6B5ADE]'
          onClick={handelNavigate}
        >
          Create Workspace
        </Button>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Workspace
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Workspace URL
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Created
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {workspaces.map((workspace) => (
                <tr key={workspace.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{workspace.name}</div>

                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {workspace.type === 'team' ? (
                        <Image
                          src="/teamWork.svg"
                          alt="team icon"
                          width={16}
                          height={16}
                        />
                      ) : (
                        <Image
                          src="/user.svg"
                          alt="User icon"
                          width={16}
                          height={16}
                        />
                      )}
                      <span className="capitalize text-sm font-medium">
                        {workspace.type === 'team' ? 'Team' : 'Personal'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900"> www.eden.com/{workspace.url}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">
                      {formatDate(workspace.createdAt)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditClick(workspace)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit workspace"
                      >
                        <Image
                          src="/pencil.svg"
                          alt="edit icon"
                          width={16}
                          height={16}
                          className='pointer-cursor'
                        />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(workspace)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete workspace"
                      >
                        <Image
                          src="/deleteIcon.svg"
                          alt="delete icon"
                          width={16}
                          height={16}
                          className='pointer-cursor'
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {workspaces.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-2">No workspaces found</div>
            <p className="text-sm text-gray-400">Create your first workspace to get started</p>
          </div>
        )}
      </div>

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        workspaceName={deleteModal.workspace?.name}
        isDeleting={deleteModal.isDeleting}
      />

      <EditDrawer
        isOpen={editDrawer.isOpen}
        onClose={handleEditCancel}
        workspace={editDrawer.workspace}
        onUpdate={handleEditUpdate}
        isUpdating={editDrawer.isUpdating}
      />
    </div>
  );
}