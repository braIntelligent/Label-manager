import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  createLabel,
  deleteLabel,
  updateLabel,
  getLabel,
} from "../api/task.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

export function LabelsFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append("nombre", data.nombre);
    formData.append("email", data.email);
    formData.append("altura", data.altura);
    formData.append("ancho", data.ancho);
    formData.append("forma", data.forma);
    formData.append("descripcion", data.descripcion);
    if (data.imagen && data.imagen[0]) {
      formData.append("imagen", data.imagen[0]);
    }

    try {
      if (params.id) {
        await updateLabel(params.id, formData);
        toast.success("Actualizada con exito!", {
          position: "bottom-right",
          style: {
            color: "white",
            backgroundColor: "#101010",
          },
        });
      } else {
        await createLabel(formData);
        toast.success("Creado con exito!", {
          position: "bottom-right",
          style: {
            color: "white",
            backgroundColor: "#101010",
          },
        });
      }
      navigate("/labels");
    } catch (error) {
      console.error("Error al crear:", error.response?.data || error.message);
    }
  });

  useEffect(() => {
    async function loadLabels() {
      if (params.id) {
        const {
          data: { nombre, email, altura, ancho, forma, descripcion },
        } = await getLabel(params.id);

        setValue("nombre", nombre);
        setValue("email", email);
        setValue("altura", altura);
        setValue("ancho", ancho);
        setValue("forma", forma);
        setValue("descripcion", descripcion);
      }
    }
    loadLabels();
  }, []);

  const estilos_inputs =
    "border-1 border-black-500 rounded-lg w-120 p-2 m-4 text-center uppercase";

  return (
    <div className="border-1 border-black-500 min-h-screen flex flex-col justify-center items-center">
      <h1 className="font-bold text-xl">
        {params.id ? "Actualizar etiqueta" : "Pedir etiqueta"}
      </h1>
      <form
        onSubmit={onSubmit}
        encType="multipart/form-data"
        className="w-200 h-200 flex flex-col justify-center items-center"
      >
        <input
          type="text"
          placeholder="Nombre"
          {...register("nombre", { required: true })}
          className={estilos_inputs}
        />

        {errors.nombre && (
          <strong style={{ color: "red" }}>Este campo es obligatorio</strong>
        )}

        <input
          type="email"
          placeholder="Correo electrónico"
          {...register("email", { required: true })}
          className={estilos_inputs}
        />

        {errors.email && <strong style={{ color: "red" }}>Correo inválido</strong>}

        <input
          type="number"
          step="0.01"
          min={2}
          placeholder="Altura"
          {...register("altura", { required: true })}
          className={estilos_inputs}
        />

        {errors.altura && <strong style={{ color: "red" }}>Este campo es obligatorio</strong>}

        <input
          type="number"
          step="0.01"
          min={2}
          placeholder="Ancho"
          {...register("ancho", { required: true })}
          className={estilos_inputs}
        />

        {errors.ancho && (
          <strong style={{ color: "red" }}>Este campo es obligatorio</strong>
        )}

        <select
          {...register("forma", { required: true })}
          className={estilos_inputs}
        >
          <option value="">Selecciona la forma</option>

          <option value="circulo">Círculo</option>
          <option value="cuadrada">Cuadrada</option>
          <option value="cuadrada_redonda">Cuadrada con puntas redondas</option>
          <option value="ovalada">Ovalada</option>
          <option value="rectangular">Rectangular</option>
          <option value="rectangular_redonda">
            Rectangular con puntas redondas
          </option>
        </select>
        {errors.forma && (
          <strong style={{ color: "red" }}>Debes seleccionar una forma</strong>
        )}

        <textarea
          rows="4"
          placeholder="Comentario"
          {...register("descripcion", { required: true })}
          className={estilos_inputs}
        ></textarea>

        {errors.descripcion && (
          <strong style={{ color: "red" }}>Este campo es obligatorio</strong>
        )}

        <input
          className={estilos_inputs}
          type="file"
          {...register("imagen", {
            required: "La imagen es obligatoria",
            validate: (fileList) => {
              const file = fileList[0];
              if (!file) return "La imagen es obligatoria";
              return (
                file.size < 2 * 1024 * 1024 ||
                "La imagen debe pesar menos de 2MB"
              );
            },
          })}
        />
        {errors.imagen && (
          <strong style={{ color: "red" }}>{errors.imagen.message}</strong>
        )}

        <button type="submit" className={estilos_inputs}>
          {params.id ? "Actualizar" : "Enviar"}
        </button>
      {params.id && (
        <button
          className="border-1 border-black-500 rounded-lg w-120 p-2 m-4 text-center uppercase text-red-500"
          onClick={async () => {
            const accepted = window.confirm("¿Estas seguro de eliminar?");
            if (accepted) {
              await deleteLabel(params.id);
              toast.success("Eliminada con exito!", {
                position: "bottom-right",
                style: {
                  color: "white",
                  backgroundColor: "#101010",
                },
              });
              navigate("/labels");
            }
          }}
        >
          eliminar
        </button>
      )}
      </form>
    </div>
  );
}
