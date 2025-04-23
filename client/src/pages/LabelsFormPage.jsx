import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  createLabel,
  deleteLabel,
  updateLabel,
  getLabel,
} from "../api/task.api";
import { useNavigate, useParams } from "react-router-dom";

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
        await updateLabel(params.id, formData)
      } else {
        await createLabel(formData);
      }
      navigate("/labels");
    } catch (error) {
      console.error("Error al crear:", error.response?.data || error.message);
    }
  });

  useEffect(() => {
    async function loadLabels() {
      if (params.id) {
        const {data: {nombre, email, altura, ancho, forma, descripcion}} = await getLabel(params.id);

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

  //otra cosa que el admin puede ver ambas pantallas, el empresa solo puede cambiar el estado del pedido

  return (
    <div>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <input
          type="text"
          placeholder="Nombre"
          {...register("nombre", { required: true })}
        />
        {errors.nombre && <span>Este campo es obligatorio</span>}

        <input
          type="email"
          placeholder="Correo electrónico"
          {...register("email", { required: true })}
        />
        {errors.email && <span>Correo inválido</span>}

        <input
          type="number"
          step="0.01"
          placeholder="Altura"
          {...register("altura", { required: true })}
        />
        {errors.altura && <span>Este campo es obligatorio</span>}

        <input
          type="number"
          step="0.01"
          placeholder="Ancho"
          {...register("ancho", { required: true })}
        />
        {errors.ancho && <span>Este campo es obligatorio</span>}

        <select {...register("forma", { required: true })}>
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
        {errors.forma && <span>Debes seleccionar una forma</span>}

        <textarea
          rows="3"
          placeholder="Descripción"
          {...register("descripcion", { required: true })}
        ></textarea>
        {errors.descripcion && <span>Este campo es obligatorio</span>}

        <input
          type="file"
          {...register("imagen", {
            validate: (fileList) => {
              const file = fileList[0];
              if (!file) return true; // opcional
              return (
                file.size < 2 * 1024 * 1024 ||
                "La imagen debe pesar menos de 2MB"
              );
            },
          })}
        />
        {errors.imagen && <span>{errors.imagen.message}</span>}

        <button type="submit">Guardar</button>
      </form>
      {params.id && (
        <button
          onClick={async () => {
            const accepted = window.confirm("are you sure?");
            if (accepted) {
              await deleteLabel(params.id);
              navigate("/labels");
            }
          }}
        >
          delete
        </button>
      )}
    </div>
  );
}
