import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground, Dimensions, Modal, Text, Button } from 'react-native';
import { useWebSocket } from '../context/WebSocketContext';
import { trapUserApi } from "../_api/trapUser.api";
import { useUser } from '../context/UserContext';

const GridScreen = () => {
  const { sendMessage, websocketTraps, setWebsocketTraps } = useWebSocket();
  const { user } = useUser();
  
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const rows = 37;
  const columns = 20; 

  const cellWidth = windowWidth / columns;
  const cellHeight = windowHeight / rows;

  const rowOffset = Math.floor(rows / 2);
  const colOffset = Math.floor(columns / 2);

  const [selectedCell, setSelectedCell] = useState({ x: null, y: null });
  const [isModalVisible, setModalVisible] = useState(false);
  const [cellToConfirm, setCellToConfirm] = useState({ x: null, y: null });

  useEffect(() => {
    if (websocketTraps.length === 0) {
      trapUserApi.findAllByIdRoom(user.roomId).then(response => {
        setWebsocketTraps(response.trap);
      }).catch(error => {
        console.log("Error during fetching traps: ", error);
      });
    }
  }, [websocketTraps]);

  const sendCoordinates = (x, y) => {
    const data = { type: 'placeTrap', data: { x, y }, nameTrap: 'Trap1', roomId: user.roomId, userId: user._id };
    sendMessage(data);
  };

  const onCellPress = (x, y) => {
    setCellToConfirm({ x, y });
    setModalVisible(true);
  };

  const confirmTrapPlacement = () => {
    sendCoordinates(cellToConfirm.x, cellToConfirm.y);
    setSelectedCell(cellToConfirm);
    setModalVisible(false);
  };

  const isTrap = (x, y) => {
    return websocketTraps.some(trap => trap.location.x === x && trap.location.y === y);
  };

  const renderGrid = () => {
    let grid = [];

    for (let row = 0; row < rows; row++) {
      let rowCells = [];
      for (let col = 0; col < columns; col++) {
        const adjustedX = col - colOffset;
        const adjustedY = rowOffset - row;
        const isSelected = selectedCell.x === adjustedX && selectedCell.y === adjustedY;
        const hasTrap = isTrap(adjustedX, adjustedY);
        
        rowCells.push(
          <TouchableOpacity
            key={`${row}-${col}`}
            style={[
              styles.cell,
              { width: cellWidth, height: cellHeight },
              isSelected ? styles.selectedCell : null,
              hasTrap ? styles.trapCell : null
            ]}
            disabled={hasTrap}
            onPress={() => onCellPress(adjustedX, adjustedY)}
          />
        );
      }
      grid.push(
        <View key={row} style={styles.row}>
          {rowCells}
        </View>
      );
    }

    return grid;
  };

  return (
    <ImageBackground style={styles.container} source={require("../assets/images/Level3-1.jpg")} resizeMode="stretch">
      <View style={styles.gridContainer}>{renderGrid()}</View>

      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Are you sure you want to place the trap here?</Text>
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <Button title="Confirm" onPress={confirmTrapPlacement} />
            </View>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

export default GridScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gridContainer: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 5,
    borderWidth: 0.5,
  },
  selectedCell: {
    backgroundColor: '#ff6961',
  },
  trapCell: {
    backgroundColor: 'red',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
