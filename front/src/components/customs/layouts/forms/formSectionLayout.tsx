import React from 'react'
import Card from '@/components/common/card';
import Description from '@admin/components/ui/description';
import _ from 'lodash';

type Props = {
    title?: string;
    description?: string;
    children?: JSX.Element[] | JSX.Element,
    hideDescription?: boolean,
}

const ABFormSectionLayout = ({ children, title, description, hideDescription }: Props) => {
    return (
        <div className="my-5 flex flex-wrap sm:my-8">
            {hideDescription ? <></> : <Description
                title={title}
                details={description}
                className="sm:pe-4 md:pe-5 w-full px-0 pb-5 sm:w-4/12 sm:py-8 md:w-1/3 "
            />}

            <Card className="w-full sm:w-8/12 md:w-2/3">
                <div className="grid  gap-3 md:grid-cols-1 lg:grid-cols-1">
                    <div>
                        {children}
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default ABFormSectionLayout