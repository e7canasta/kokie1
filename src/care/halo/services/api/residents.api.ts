/**
 * API Service Layer - Residents
 * Centraliza todas las llamadas API relacionadas con residents
 * Incluye validación runtime con Zod para protección contra cambios inesperados del backend
 */

import type { Resident } from "../../types/resident.types";
import { ResidentSchema, ResidentsArraySchema } from "../../types/resident.schema";
import { ZodError } from "zod";

const API_BASE_URL = "/api";

export interface ApiError {
  message: string;
  status?: number;
  validationErrors?: string[];
}

class ResidentsApiService {
  /**
   * Obtiene la lista de todos los residents
   * Valida la respuesta con Zod para garantizar type safety en runtime
   */
  async getAllResidents(): Promise<Resident[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/residents`);

      if (!response.ok) {
        throw new Error(`Failed to fetch residents: ${response.statusText}`);
      }

      const data = await response.json();

      // Runtime validation con Zod
      const validated = ResidentsArraySchema.parse(data);

      return validated;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Obtiene los detalles de un resident por ID
   * Valida la respuesta con Zod para garantizar type safety en runtime
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

      const data = await response.json();

      // Runtime validation con Zod
      const validated = ResidentSchema.parse(data);

      return validated;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Maneja errores de API de forma consistente
   * Incluye manejo especial para errores de validación Zod
   */
  private handleError(error: unknown): ApiError {
    // Errores de validación Zod
    if (error instanceof ZodError) {
      return {
        message: "API response validation failed",
        validationErrors: error.errors.map(e => `${e.path.join('.')}: ${e.message}`),
      };
    }

    // Errores estándar
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
