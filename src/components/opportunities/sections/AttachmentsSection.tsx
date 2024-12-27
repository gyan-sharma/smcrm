import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { Attachment } from '../../../types';

interface AttachmentsSectionProps {
  initialData?: Partial<Attachment[]>;
  isLoading?: boolean;
  onFilesChange: (files: File[]) => void;
}

export default function AttachmentsSection({ isLoading, onFilesChange }: AttachmentsSectionProps) {
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setPendingFiles(prev => [...prev, ...acceptedFiles]);
      onFilesChange(acceptedFiles);
    },
    disabled: isLoading
  });

  const removeFile = (fileToRemove: File) => {
    setPendingFiles(files => files.filter(file => file !== fileToRemove));
    onFilesChange(pendingFiles.filter(file => file !== fileToRemove));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Attachments</h3>
      
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
          ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          Drag and drop files here, or click to select files
        </p>
      </div>

      {pendingFiles.length > 0 && (
        <ul className="mt-4 divide-y divide-gray-200">
          {pendingFiles.map((file, index) => (
            <li key={index} className="py-3 flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900">{file.name}</span>
                <span className="ml-2 text-sm text-gray-500">
                  ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>
              <button
                type="button"
                onClick={() => removeFile(file)}
                className="text-red-600 hover:text-red-900"
                disabled={isLoading}
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}