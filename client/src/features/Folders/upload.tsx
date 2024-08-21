import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import axios from "axios";

const Upload = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File>();
  const [uploadedFile, setUploadedFile] = useState<File>();
  const [error, setError] = useState<Error>();

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files;
    if (file !== null) setFile(file[0]);
  }

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    const url = "http://localhost:3001/import";
    const formData = new FormData();
    if (file) {
      formData.append("import", file);
      formData.append("fileName", file.name);
    }
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    console.log(formData);
    axios
      .post(url, formData, config)
      .then((response) => {
        console.log(response.data);
        setUploadedFile(response.data.file);
      })
      .catch((error) => {
        console.error("Error uploading file: ", error);
        setError(error);
      });
  }

  return (
    <div className="flex h-16 shrink-0 items-center">
      <Button
        onClick={open}
        className="rounded-md bg-black/70 px-4 py-2 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/80 data-[focus]:outline-1 data-[focus]:outline-white"
      >
        Import bookmarks!
      </Button>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="data-[closed]:transform-[scale(95%)] w-full max-w-md rounded-xl bg-black/70 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-white"
              >
                Import your bookmark file here!
              </DialogTitle>
              <div className="mt-2 text-sm/6 text-white/50">
                <input type="file" name="import" onChange={handleChange} />
                <button onClick={handleSubmit}>Submit</button>
                {uploadedFile && `File succefully uploaded`}
                {error && <p>Error uploading file: {error.message}</p>}
              </div>
              <div className="mt-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                  onClick={close}
                >
                  Done!
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Upload;
