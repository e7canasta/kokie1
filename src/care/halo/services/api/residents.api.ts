/**
 * API Service Layer - Residents
 * Centraliza todas las llamadas API relacionadas con residents
 */

import type { Resident } from "../../types/resident.types";

const API_BASE_URL = "/api";

export interface ApiError {
  message: string;
  status?: number;
}

class ResidentsApiService {
  /**
   * Obtiene la lista de todos los residents
   */
  async getAllResidents(): Promise<Resident[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/residents`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch residents: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Obtiene los detalles de un resident por ID
   */
  async getResidentById(id: string | number): Promise<Resident> {
    try {
      if (!id || id === "undefined") {
        throw new Error("Invalid resident ID");
      }

      const response = await fetch(`${API_BASE_URL}/residents/${id}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Resident not found");
        }
        throw new Error(`Failed to fetch resident: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Maneja errores de API de forma consistente
   */
  private handleError(error: unknown): ApiError {
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    }
    
    return {
      message: "An unexpected error occurred",
    };
  }
}

export const residentsApi = new ResidentsApiService();
