import React, {useState, useMemo} from 'react';
import Pagination from "@admin/components/ui/pagination";
import { Table } from '@/components/ui/table';
import { useTranslation } from 'next-i18next';
import TitleWithSort from '@admin/components/ui/title-with-sort';
import {
  TagPaginator,
  QueryTagsOrderByColumn,
  SortOrder,
} from '__generated__/__types__';
import { useIsRTL } from '@/utils/locals';
import debounce from "lodash/debounce";
import ActionButtons from "@admin/components/common/action-buttons";


const ACDataTable = ({columns, data}: any) => {
  const { t } = useTranslation();
  const rowExpandable = (record: any) => record.children?.length;
  const { alignLeft, alignRight } = useIsRTL();

  const [order, setOrder] = useState<SortOrder>(SortOrder.Desc);
  const [column, setColumn] = useState<string>();

  const debouncedHeaderClick = useMemo(
    () =>
      debounce((value) => {
        setColumn(value);
        setOrder(order === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc);
        // refetch({
        //   orderBy: [
        //     {
        //       column: value,
        //       order: order === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc,
        //     },
        //   ],
        // });
      }, 300),
    [order]
  );

  const onHeaderClick = (value: string | undefined) => ({
    onClick: () => {
      debouncedHeaderClick(value);
    },
  });


  return (
    <>
      <div className="mb-6 overflow-hidden rounded shadow">
        <Table
          //@ts-ignore
          columns={columns}
          emptyText={"Nothing to display"}
          //@ts-ignore
          data={data}
          rowKey="id"
          scroll={{ x: 1000 }}
          expandable={{
            expandedRowRender: () => '',
            rowExpandable: rowExpandable,
          }}
        />
      </div>

      <div className="flex justify-end items-center">
          <Pagination
            total={1}
            current={1}
            pageSize={1}
            // onChange={1} 
            // total={paginatorInfo.total}
            // current={paginatorInfo.currentPage}
            // pageSize={paginatorInfo.perPage}
            // onChange={onPagination}
          />
        </div>
    </>
  );
};

export default ACDataTable;
