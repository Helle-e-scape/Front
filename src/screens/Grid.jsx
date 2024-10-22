import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Button } from 'react-native';
import { Dimensions } from 'react-native';
import { useWebSocket } from '../context/WebSocketContext';

const GridScreen = ({route}) => {
    // get the socket from the context
    const {sendMessage} = useWebSocket();
    const rows = 10;
    const columns = 10;
    const cellSize = 40; // Taille de chaque cellule (en pixels)

    const [selectedCell, setSelectedCell] = useState({ x: null, y: null });


    const sendCoordinates = (x, y) => {

          const data = { type: 'placeTrap', data: { x, y } };
          sendMessage(data);
        //   Alert.alert(`Trap placed at (${x}, ${y})`);
        //   socket.send(JSON.stringify(data));
    };

    const onCellPress = (x, y) => {
        setSelectedCell({ x, y });
    };

    const renderGrid = () => {
        let grid = [];
    
        for (let row = 0; row < rows; row++) {
          let rowCells = [];
          for (let col = 0; col < columns; col++) {
            const isSelected = selectedCell.x === col && selectedCell.y === row;
            rowCells.push(
              <TouchableOpacity
                key={`${row}-${col}`}
                style={[styles.cell, isSelected ? styles.selectedCell : null]}
                onPress={() => onCellPress(col, row)}
              >
                <Text style={styles.cellText}>{col}, {row}</Text>
              </TouchableOpacity>
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
        <View style={styles.container}>
          <Text style={styles.title}>Select a Trap Location</Text>
          <View style={styles.gridContainer}>{renderGrid()}</View>
          <Button title="Place Trap" onPress={() => sendCoordinates(selectedCell.x, selectedCell.y)} />
        </View>
      );
}
export default GridScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
      maxWidth: Dimensions.get('window').width,
    },
    title: {
      fontSize: 20,
      marginBottom: 20,
      fontWeight: 'bold',
    },
    gridContainer: {
         flexDirection: 'column',
    },
    row: {
      flexDirection: 'row',
    },
    cell: {
      width: 35,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#d3d3d3',
      margin: 2,
      borderRadius: 5,
    },
    selectedCell: {
      backgroundColor: '#ff6961',
    },
    cellText: {
      fontSize: 12,
      color: '#000',
    },
  })