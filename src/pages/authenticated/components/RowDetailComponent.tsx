
interface IRowDetailComponentProps {
    label: string,
    value?: string,
}

interface IRowDateComponentProps {
    label: string,
    value?: Date,
}

interface IRowBooleanComponentProps {
    label: string,
    value?: boolean,
}

interface IRowLargeTextComponentProps {
    label: string,
    value?: string,
}

export const RowDetailComponent: React.FC<IRowDetailComponentProps> = ({ label, value }) => {

    return (
        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">{label}</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{value}</dd>
        </div>
    )
}

export const DateDetailComponent: React.FC<IRowDateComponentProps> = ({ label, value }) => {

    let date = "";
    if (value) {
        try {
            date = value.toDateString();
        } catch (error) {
            date = "";
        }
    }

    return (
        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">{label}</dt>
            {date && (<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{date}</dd>)}
        </div>
    )
}

export const BooleanDetailComponent: React.FC<IRowBooleanComponentProps> = ({ label, value }) => {

    return (
        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">{label}</dt>
        <dd className="mt-1 sm:mt-0 sm:col-span-2">
            <span className={`px-2 py-1 inline-flex text-xs rounded-full ${value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {value? 'Active' : 'Inactive'}
            </span>
        </dd>
    </div>
    )
}

export const LargeTextDetailComponent: React.FC<IRowLargeTextComponentProps> = ({ label, value }) => {
    return (
        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">{label}</dt>
            <dd
                className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                dangerouslySetInnerHTML={value ? { __html: value } : undefined}
            />
        </div>
    );
};
