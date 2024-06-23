import { IDevice } from "@/api/types";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import {
  Card,
  Divider,
  Icon,
  IconButton,
  Switch,
  Text,
} from "react-native-paper";
import { router } from "expo-router";

interface DeviceProps {
  thingId: string
  device: IDevice;
  deviceIndex: number;
}
const Device = ({ device, thingId, deviceIndex }: DeviceProps) => {
  const [isSwitchOn, setIsSwitchOn] = useState(true);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <>
      <Card mode="outlined" key={device._id}>
        <Card.Content>
          <div style={styles.device}>
            <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
              <Text style={{ color: "gray" }}>Name</Text>
              <Text>{device.name}</Text>
            </div>
            <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
              <Text style={{ color: "gray" }}>Model</Text>
              <Text>{device.model?.name}</Text>
            </div>
            <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
              <Text style={{ color: "gray" }}>Default Parameter</Text>
              <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
            </div>
            {!isSwitchOn ? (
              <>
                <Divider />
                {device.parameterStandards.map((item, index) => (
                  <div
                    style={{ display: "flex", gap: 5, alignItems: "center" }}
                    key={index}
                  >
                    <Text>{item.name}</Text>
                    <IconButton
                      onPress={() => router.push(`/update-param?thingId=${thingId}&paramIndex=${index}&deviceIndex=${deviceIndex}`)}
                      icon="upload"
                      iconColor={"#65c1ff"}
                      size={20}
                    />
                  </div>
                ))}
              </>
            ) : (
              <></>
            )}
          </div>
        </Card.Content>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  device: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 5,
  },
});
export default Device;
