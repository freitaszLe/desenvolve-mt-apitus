import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

export type SubmissionFormData = z.infer<typeof submissionSchema> & {
  fotoUrl?: string | null;
};

interface SubmissionFormProps {
  personName: string;
  onClose: () => void;
  onSave: (data: SubmissionFormData) => void; 
}

const submissionSchema = z.object({
  observacoes: z.string().min(10, { message: "Por favor, detalhe mais sua observação (mínimo 10 caracteres)." }),
  dataAvistamento: z.string().refine((val) => /^\d{2}\/\d{2}\/\d{4}$/.test(val), {
    message: "Data inválida. Use o formato DD/MM/AAAA.",
  }),
  localizacao: z.string().min(5, { message: "Por favor, informe um local (mínimo 5 caracteres)." }),
  foto: z.any().optional(),
});


const SubmissionForm = ({ personName, onClose, onSave }: SubmissionFormProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, control } = useForm<SubmissionFormData>({
    resolver: zodResolver(submissionSchema),
  });

  const handleFormSubmit = (data: SubmissionFormData) => {
    const dataToSave: SubmissionFormData = {
      ...data,
      fotoUrl: previewImage 
    };
    onSave(dataToSave);
    alert(`Obrigado! Sua informação sobre ${personName} foi adicionada à página.`);
    onClose();
  };
  
  const handleDateMask = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 8) value = value.slice(0, 8);
    if (value.length > 4) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4)}`;
    } else if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    return value;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setPreviewImage(fileUrl);
    } else {
      setPreviewImage(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div className="bg-dark-card border border-dark-border rounded-lg shadow-xl w-full max-w-lg p-6 md:p-8" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold text-white mb-1">Registrar Nova Informação</h2>
        <p className="text-text-muted mb-6">Sobre: <span className="font-semibold text-text-light">{personName}</span></p>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <label htmlFor="observacoes" className="block text-sm font-semibold text-text-muted mb-1">Observações</label>
            <textarea 
              id="observacoes"
              {...register("observacoes")}
              className="w-full bg-gray-cyber border border-dark-border rounded-md p-2 text-text-light focus:outline-none focus:ring-2 focus:ring-neon-red focus:border-transparent transition"
              rows={4}
              placeholder="Ex: Foi visto(a) na Praça Central, parecia desorientado(a)..."
            />
            {errors.observacoes && <p className="text-red-400 text-sm mt-1">{errors.observacoes.message}</p>}
          </div>

          <div>
            <label htmlFor="dataAvistamento" className="block text-sm font-semibold text-text-muted mb-1">Data em que foi visto(a)</label>
            <Controller
              name="dataAvistamento"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  onChange={(e) => field.onChange(handleDateMask(e))}
                  id="dataAvistamento"
                  className="w-full bg-gray-cyber border border-dark-border rounded-md p-2 text-text-light focus:outline-none focus:ring-2 focus:ring-neon-red focus:border-transparent transition"
                  placeholder="DD/MM/AAAA"
                />
              )}
            />
            {errors.dataAvistamento && <p className="text-red-400 text-sm mt-1">{errors.dataAvistamento.message}</p>}
          </div>

          <div>
            <label htmlFor="localizacao" className="block text-sm font-semibold text-text-muted mb-1">Localização avistada</label>
            <input
              type="text"
              id="localizacao"
              {...register("localizacao")}
              className="w-full bg-gray-cyber border border-dark-border rounded-md p-2 text-text-light focus:outline-none focus:ring-2 focus:ring-neon-red focus:border-transparent transition"
              placeholder="Ex: Cuiabá, MT, Bairro Centro, próximo ao..."
            />
            {errors.localizacao && <p className="text-red-400 text-sm mt-1">{errors.localizacao.message}</p>}
          </div>
          
          <div>
            <label htmlFor="fotos" className="block text-sm font-semibold text-text-muted mb-1">Anexar foto (opcional)</label>
            <input
              type="file"
              id="fotos"
              accept="image/*"
              {...register("foto")}
              onChange={handleFileChange}
              className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-900/50 file:text-blue-300 hover:file:bg-blue-900 transition"
            />
          </div>

          {previewImage && (
            <div className="mt-2">
              <p className="text-sm font-semibold text-text-muted mb-2">Prévia da imagem:</p>
              <img src={previewImage} alt="Prévia" className="rounded-lg max-h-40 mx-auto border border-dark-border" />
            </div>
          )}

          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-6 rounded-md transition-colors">
              Cancelar
            </button>
            <button type="submit" className="bg-neon-red hover:bg-neon-red-dark text-white font-bold py-2 px-6 rounded-md transition-colors">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmissionForm;