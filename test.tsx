type FormValues = {
  formName: string;
  exercices: ExercicesTypes;
};

const getStoredData = (): ExercicesTypes => {
  const data = localStorage.getItem('data');
  console.log('data', data);
  return data ? JSON.parse(data) : [];
};

function App() {
  const [isAdd, setIsAdd] = useState(false);
  const { control, register, watch, getValues } = useForm<FormValues>({
    defaultValues: { formName: '', exercices: getStoredData() }
  });
  const tempName = watch('formName');
  console.log(watch());
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormProvider)
      name: 'exercices' // unique name for your Field Array
    }
  );

  useEffect(() => {
    const interId = setInterval(() => {
      localStorage.setItem('data', JSON.stringify(getValues('exercices')));
    }, 1000);
    return () => clearInterval(interId);
  });

  return (
    <>
      {fields.map((category, index) => {
        return (
          <div key={category.id}>
            <input
              placeholder="Name"
              {...register(`exercices.${index}.name`)}
            />
            <SessionsDisplay
              control={control}
              register={register}
              nestedIndex={index}
            />
          </div>
        );
      })}
      <Button onClick={() => setIsAdd(true)}>ADD Category</Button>
      {isAdd && (
        <>
          <input placeholder="Name" {...register('formName')} />
          <Button
            onClick={() => {
              append({ name: tempName, sessions: [] });
              setIsAdd(false);
            }}
          >
            Save
          </Button>
        </>
      )}
    </>
  );
}

const SessionsDisplay: FC<{
  control: Control<FormValues>;
  register: UseFormRegister<FormValues>;
  nestedIndex: number;
}> = ({ control, register, nestedIndex }) => {
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormProvider)
      name: `exercices.${nestedIndex}.sessions` // unique name for your Field Array
    }
  );

  if (fields.length === 0) {
    return (
      <>
        <p>Pas encore de session</p>
        <Button
          onClick={() =>
            append({ date: new Date().toDateString(), max: null, series: [] })
          }
        >
          Add new Sessions
        </Button>
      </>
    );
  }

  return (
    <>
      {fields.map((session, index) => (
        <div key={session.id}>
          <p>Date : {session.date}</p>
        </div>
      ))}
      <Button
        onClick={() =>
          append({ date: new Date().toDateString(), max: null, series: [] })
        }
      >
        Add new Sessions
      </Button>
    </>
  );
};
