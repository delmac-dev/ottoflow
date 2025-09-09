import { AppShell, Tabs, Text } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import AIArea from './ai-area'
import DataPanel from './data-panel'
import SchemaPanel from './schema-panel'
import { useDebouncedValue } from '@mantine/hooks'
import { useStore } from 'zustand'
import { scheduleStore } from '@/lib/stores/schedule.store'
import { useSaveProjectData, useSaveProjectProperties } from '@/lib/query.hooks'
import { appStore } from '@/lib/stores/app.store'

const dataPanel = [
  { tab: '1', name: 'Data', content: DataPanel },
  { tab: '2', name: 'Schema', content: SchemaPanel },
]

export default function DataContainer() {
  const [tab, setTab] = useState<string | null>('1');
  const mountedData = React.useRef(false);
  const mountedProperties = React.useRef(false);
  const projectID = useStore(appStore, (s) => s.projectID);
  const data = useStore(scheduleStore, (s) => s.data);
  const setIsDataSaving = useStore(scheduleStore, (s) => s.setIsDataSaving);
  const setIsPropertiesSaving = useStore(scheduleStore, (s) => s.setIsPropertiesSaving);
  const [debouncedData] = useDebouncedValue(data, 5000);
  const properties = useStore(scheduleStore, (s) => s.properties);
  const [debouncedProperties] = useDebouncedValue(properties, 5000);
  const { mutate: mutateData, isPending: savingData } = useSaveProjectData();
  const { mutate: mutateProperties, isPending: savingProperties } = useSaveProjectProperties();

  useEffect(() => {
    if (!debouncedData) return;

    // Skip the first run on mount
    if (!mountedData.current) {
      mountedData.current = true;
      return;
    }
    if( !projectID ) return;
    mutateData({ data: debouncedData, projectID: projectID });
  }, [debouncedData]);
  
  useEffect(() => {
    if (!debouncedProperties) return;

    // Skip the first run on mount
    if (!mountedProperties.current) {
      mountedProperties.current = true;
      return;
    }
    if( !projectID ) return;
    mutateProperties({ properties: debouncedProperties, projectID: projectID });
  }, [debouncedProperties]);

  useEffect(() => {
    setIsDataSaving(savingData);
  }, [savingData, setIsDataSaving]);

  useEffect(() => {
    setIsPropertiesSaving(savingProperties);
  }, [savingProperties, setIsPropertiesSaving]);

  return (
    <AppShell.Navbar>
      <Tabs
        inverted
        value={tab}
        onChange={setTab}
        classNames={{
          list: "before:border-0!",
          tab: "data-[active]:bg-dark-600 data-[active]:border-t-2 py-2! rounded-none",
        }}
        renderRoot={(props) => <AppShell.Section {...props} grow />}
      >
        <Tabs.List>
          {dataPanel.map(item => (
            <Tabs.Tab key={item.tab} value={item.tab} px="xs" className='h-8'>
              <Text size='xs' fw={700}>
                {item.name}
              </Text>
            </Tabs.Tab>
          ))}
        </Tabs.List>
        {dataPanel.map(item => (
          <Tabs.Panel
            key={item.tab}
            value={item.tab}
            className='h-[calc(100%-32px)]'
          >
            <item.content />
          </Tabs.Panel>
        ))}
      </Tabs>
      <AIArea />
    </AppShell.Navbar>
  )
}
