import { useForm } from "react-hook-form";
export const ReactHookForm = () => {
  const { handleSubmit, register } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="flex justify-center items-center  w-full h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 max-w-52"
      >
        <label>First Name:</label>
        <input
          {...register("firstname", { required: true })}
          className="border rounded-md p-1 "
          placeholder="firstname"
        />
        <label>Last Name:</label>

        <input
          {...register("lastname", { required: true })}
          className="border rounded-md p-1"
          placeholder="lastname"
        />
        <label>Email:</label>
        <input
          {...register("email", { required: true })}
          className="border rounded-md p-1 "
          placeholder="Email"
        />
        <label>age:</label>
        <input
          {...register("age", { required: true })}
          className="border rounded-md p-1"
          placeholder="Age"
        />
        <label>Mobile:</label>
        <input
          {...register("mobile", { required: true })}
          className="border rounded-md p-1"
          placeholder="Mobile"
        />
        <label>institution:</label>
        <input
          {...register("instutution", { required: true })}
          className="border rounded-md p-1"
          placeholder="institution"
        />
        <label>address:</label>
        <input
          {...register("address", { required: true })}
          className="border rounded-md p-1"
          placeholder="address"
        />
        <button type="submit" className="border px-1 rounded-md cursor-pointer">
          submit
        </button>
      </form>
    </div>
  );
};
